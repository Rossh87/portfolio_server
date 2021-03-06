// Get configured database object.  This could be configured as an injection
// in the future, if we ever wanted to use these handlers with a different db
const db = require('../services/airtable');

function pruneProjectData(obj, type) {
	return Object.assign({}, obj.fields, {
		id: obj.id,
		type
	});
}

async function getOneProjectType(req, res, next) {
	const {name} = req.params;

	try {
		const records = await db('project_types').select({view: 'Grid view'}).firstPage();

		// Prune all records except the one whose name corresponds to req.params.name
		const desiredRecord = records.filter(rec => {
			return rec.get('name') === name;
		});

		// Get the array of project ids linked to the desired record, then use async
		// db method 'find' to load promise for each id.  Await all promises at end
		// so that requests can be made concurrently.
		const desiredProjects = await Promise.all(
			desiredRecord[0]
				.get('projects')
				.map(
					async projectID => db('projects').find(projectID)
				)
		);

		// Prune unneeded data from found objects
		const prunedData = desiredProjects.map(
			project => pruneProjectData(project, name)
		)

		// End req/res cycle
		res.json(prunedData);
	}

	catch(err) {
		next(err);
	}
}

// The following is unused for the moment

async function getAllRecords(req, res, next) {
	try {
		// await the object containing all ref ids
		const records = await db('project_types').select({view: 'Grid view'}).firstPage();

		// Run async 'find' method
		// on each ref in record projects array and wait for 
		// all promises in array to resolve.
		const recObj = await records.reduce(async (prevPromise, rec) => {
			// Tricky business here.  Async callback passed to reduce will *always* return a Promise, so our initial
			// accumulator value should be a promise that resolves to the value of our desired accumulator state,
			// then in each iteration await the resolution of the promise passed by the *previous* step.
			const collection = await prevPromise;

			const refsArr = await Promise.all(rec.get('projects')
				.map(projectID => db('projects').find(projectID))
			);

			// strip out unneeded data from resolved promises
			const finalData = refsArr.map(data => {
				return Object.assign({}, data.fields, {
					id: data.id
				});
			});

			// Assign the array of found data objects to the appropriate key
			// in the accumulator object.
			collection[rec.get('name')] = finalData;
			return collection;
		}, Promise.resolve({}));

		res.json(recObj);
	}

	catch(err) {
		next(err);
	}
}

module.exports = {
	getAllRecords,
	getOneProjectType
}