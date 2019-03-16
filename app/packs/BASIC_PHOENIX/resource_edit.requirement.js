const requirement = {
  name: 'Edit resource',
  template: './template/edit.template.ejs',
  data(entity) {
    return entity;
  },
  children: [{ file: 'resource_edit_go_back_button.requirement.js' }]
};
