import {DatasetsClient, createClient} from "@sanity/client"
import { fetchQuery } from "./utils/supports";

const client = createClient({
	projectId: "17dgjl6y",
	dataset: "beauty-app",
	apiVersion : "2021-10-21",
	useCdn: true
});

export const fetchFeeds = async () => {
	let data= await client.fetch(fetchQuery).then(feeds => {return feeds});
	return data;
}