const requirement = {
  name: 'List resources',
  template: './template/index.template.ejs',
  data(entity) {
    return entity;
  },
  children: [
    { file: 'resource_list_delete_button.requirement.js' },
    { file: 'resource_list_edit_button.requirement.js' },
    { file: 'resource_list_show_button.requirement.js' }
  ]
};
