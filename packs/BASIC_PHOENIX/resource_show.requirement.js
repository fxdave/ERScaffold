const requirement = {
  name: 'Show a resource',
  template: './template/show.template.ejs',
  data(entity) {
    return entity;
  },
  children: [
    { file: 'resource_show_go_back_button.requirement.js' },
    { file: 'resource_show_edit_button.requirement.js' }
  ]
};
