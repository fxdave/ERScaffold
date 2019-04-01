const requirement = {
    name: 'Scaffolded phoenix application with docker',
    template: './docker-compose.yml.ejs',
    data(entity) {
      // this can be generated for all entities so this will not return null
      // but this tempalte should be generated only once so we pass an empty array so that this will be identical for all entities
      return []; 
    },
    children: []
  };
  