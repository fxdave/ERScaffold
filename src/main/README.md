
1. The system shows the available templates
   1. Collects the packs [DONE]
   2. Collects the entities [DONE]
   3. Filter templates by passing the entities to data [TESTING]
   4. Gives back the templates for each entities
2. The user selects the templates that they want
3. The system generates the selected templates
   1. Tries to generate each template
      1. Reads the meta from the template
      2. Before writing it into the filesystem genereate the deps first 
   2. Gives back the list of the generated files