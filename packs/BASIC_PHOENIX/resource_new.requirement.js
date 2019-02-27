const requirement = {
  name: 'Create new resource',
  template: './template/new.template.ejs',
  data(entity) {
    return entity;
  },
  children: [{ file: 'resource_new_go_back_button.requirement.js' }]
};
