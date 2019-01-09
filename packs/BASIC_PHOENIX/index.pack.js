let pack = {
    name : "Basic Phoenix",
    requirements: [
        {
            file: 'resource_new.requirement.js',
            children: [
                { file: 'resource_new_go_back_button.requirement.js' }
            ]
        }, {
            file: 'resource_list.requirement.js',
            children: [
                { file: 'resource_list_delete_button.requirement.js' },
                { file: 'resource_list_edit_button.requirement.js' },
                { file: 'resource_list_show_button.requirement.js' }
            ]
        }, {
            file: 'resource_edit.requirement.js',
            children: [
                { file: 'resource_edit_go_back_button.requirement.js' }
            ]
        }, {
            file: 'resource_show.requirement.js',
            children: [
                { file: 'resource_show_go_back_button.requirement.js' },
                { file: 'resource_show_edit_button.requirement.js' }
            ]
        }
    ]
}