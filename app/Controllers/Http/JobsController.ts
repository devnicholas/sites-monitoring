// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import http from 'http'
import https from 'https'
import Site from "App/Models/Site"

export default class JobsController {
    public static async runJobs(interval: number) {
        const sites = await Site.query().where('interval', interval)

        for (const site of sites) {
            let res
            if (site.url.startsWith('http://')) {
                res = await JobsController.httpConsult(site.url)
            } else {
                res = await JobsController.httpsConsult(site.url)
            }
            await site.related('verifications').create({
                status: res.status,
                message: res.message
            })
        }
    }

    public static async httpsConsult(url) {
        return new Promise((resolve, reject) => {
            https
                .get(url, (res) => {
                    resolve(JobsController.getRequest(res))
                })
                .setTimeout(5000, () => {
                    resolve(JobsController.timeOutRequest())
                })
                .on("error", function (e) {
                    resolve(JobsController.errorRequest(e));
                });
        })
    }
    public static async httpConsult(url) {
        return new Promise((resolve, reject) => {
            http
                .get(url, (res) => {
                    resolve(JobsController.getRequest(res))
                })
                .setTimeout(5000, () => {
                    resolve(JobsController.timeOutRequest())
                })
                .on("error", function (e) {
                    resolve(JobsController.errorRequest(e));
                });
        })
    }

    private static getRequest(res) {
        return {
            status: res.statusCode,
            message: res.statusMessage
        }
    }
    private static timeOutRequest() {
        return {
            status: 408,
            message: 'Request timeout'
        }
    }
    private static errorRequest(e) {
        return {
            status: 500,
            message: e.message
        }
    }
}
