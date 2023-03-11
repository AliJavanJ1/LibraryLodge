import {useSelector} from "react-redux";
import {useMemo} from "react";
import _ from "lodash";

export function useLocationItems(shared = false){
    const location = useSelector(state => state.env.location)
    const tree = useSelector(state => shared ? state.sharedTree : state.tree)
    console.log(tree, location)
    return useMemo(() => {
        let node = _.reduce(location, (node, loc) => node.libraries[loc], tree)
        return node ? {files: node.files, libs: _.keys(node.libraries)} : {files: [], libs: []}
    }, [location, tree])
}

export function useLocationFileTemplate(shared = false){
    const library_details = useSelector(state => state.library_details)
    const file_templates = useSelector(state => state.file_templates)
    const location = useSelector(state => state.env.location)
    const library_detail = location.length > 0 ? library_details[_.last(location)] : null
    return library_detail ? file_templates[library_detail.file_template] : null
}
