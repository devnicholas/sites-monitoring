import schedule from 'node-schedule'
import JobsController from 'App/Controllers/Http/JobsController';

schedule.scheduleJob('*/10 * * * *', async function () {
    // each 10 minutes
    await JobsController.runJobs(10)
});
schedule.scheduleJob('*/30 * * * *', async function () {
    // each 30 minutes
    await JobsController.runJobs(30)
});
schedule.scheduleJob('*/60 * * * *', async function () {
    // each 60 minutes
    await JobsController.runJobs(60)
});