import _ from "lodash"
import tools from "./tools"

export const contains = ({ name, details }, query) => {
    if (name.includes(query) || details.includes(query)) {
        return true;
    }
    return false;
};

export const getTools = (limit = 20, query = "") => {
    return new Promise((resolve, reject) => {
        if (query.length === 0) {
            resolve(_.take(tools, limit));
        } else {
            const formattedQuery = query.toLowerCase();
            const results = _.filter(tools, tool => {
                return contains(tool, formattedQuery);
            });
            resolve(_.take(results, limit));
        }
    });
};

export default getTools