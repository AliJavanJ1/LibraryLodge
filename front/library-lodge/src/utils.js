import {useSelector} from "react-redux";
import {useMemo} from "react";
import _ from "lodash";

export function useLocationItems(){
    const location = useSelector(state => state.env.location)
    const tree = useSelector(state => state.tree)
    return useMemo(() => {
        let node = _.reduce(location, (node, loc) => node.libraries[loc], tree)
        return {files: node.files, libs: _.keys(node.libraries)}
    }, [location, tree])
}
