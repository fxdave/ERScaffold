# Topic ideas

1.  Hungarian abstract (with keywords)
    - NEED HELP!
2.  Abstract (with keywords)
    - NEED HELP!
3.  Thanks giving
    - ...
    - ...
4.  Motivation
    1. Story of a dead project
       - Order details
       - Wordpress
       - Woocommerce
       - Too deep changes
       - A lot of workarounds
       - The end
    2. Why say no to **Component based development**
       - Introduction of **Component based development**
       - Why businesses choose this development form
       - Components are too specific, not for every kind of problems
       - Components are more then we actually need
       - Not every components developer friendly
       - They are too limited
       - changing business requirements
    3. Why **Fast prototyping**
       - Introduction of **Fast prototyping**
       - Developer friendly
       - Not limited
       - The result has minimal overhead, but also satisfies the needs
       - The result is a well organized project
       - Fits well for changing business requirements
       - Why is not **Fast prototyping** in use?
    4. The perfect tool for **Fast prototyping**
       - code generator for creating a production ready prototype
       - code generator that allows us to add features after any modifications
       - a good language for telling easily what to generate
       - a good software for composing these language elements
    5. It is possible to generate relational database based applications
    6. Similar technologies
       1. Admin page generator for _Laravel framework_
          - Introduction of _Laravel framework_
          - Introduction of Admin page generator
          - What is missing
       2. Builtin cli tool of _Phoenix framework_
          - Introduction of _Phoenix framework_
          - Introduction of cli tool of _Phoenix_
          - What is missing
       3. How is it possible to improve
          - these tools are basically _management_ generators for only one resource
          - adding more resource
          - adding relations
5.  System design

    1. Modeller
       1. Entity Relationship Model
          - Original target
          - Elements
          - Comparing to logic chart
       2. Existing _Entity Relationship_ modellers (cons, pros)
          1. **Draw.io**
             - Introduction of **Draw.io**
             - Adventages
             - Disadventages
       3. Why is this modeller the best out of the internet
          - automatic arrangement
          - one click / actions
          - friendly - good looking UI
       4. Model improvements for being able for a code generator
          - Types (not ready yet)
          - Validations (not ready yet)
          - Entity's repository name
    2. Modules and their functionalities
       1. Controllers
          - PackController
          - ERModelController
       2. Package utilities
          - PackReader
          - PackCollectionReader
          - TemplateReader
          - TemplateRenderer
          - ERGitter
          - Generator
       3. General utilities
          - NameFormatter
          - Router
          - GitWrapper
          - FsWrapper
    3. Conventions
       - Importance of modularity and component reuse
       - Mutability in depth
       - Dependency injection
       - Test based development
       - Model View Controller

6.  Technologies

    1. Used libraries

       - Nodejs
       - Electron
       - React
       - Docker
       - Others

    2. Used own librarires (publicly available on MIT license)

       - vecjs (Vector library for javascript)
       - react-konva-anchors (Positioning library for react-konva based canvas applications)
       - simple-electron-react-boilerplate (Boilerplate for electron-react applications)
       - fastejs (faster and better alternative to ejs template engine)

7.  End user documentation

    1.  Requirements
        - git
        - docker and docker-compose
        - linux or mac
    2.  UI elements
        1. Viewport
           - entites
           - properties
           - connections
        2. Footbar
           - Application name input
           - Import button
           - Export button
           - Generate button
    3.  Create your own ERModel
        - Creating an entity
        - Deleting an entity
        - Adding Property to and entity
        - Possible types
    4.  Generate an application using the built-in templates
        1. Generation in depth
           - Introduction
           - Git branching technique for later modifications
           - Template packs
           - Feature requirements
        2. Initialization of your project folder (will be deprecated)
           - this would be replaced with full project creation
        3. Importance of application name
           - where do the templates use it?
    5.  Templates in depth
        1. Theory
           - Introduction
           - Creating a file
           - Extending a file
           - Dependencies
           - Circular dependencies
        2. Write your own
           1. Initialize your first template pack index file
              - Reason of existance
              - Naming convention
              - API
           2. Create your first requirement file
              - Reason of existance
              - Naming convention
              - API
           3. Create your first template
              - Introduction
              - Naming convention
              - API
        3. Documentation of the built-in 'Basic phoenix' template pack
           1. Introducing Phoenix framework
              - Introducing Elixir programming language
              - Why are functional languages good for web backend
              - Introducing Phoenix framework
              - Examples for other backend frameworks
           2. Template requirements
              - Basic requirements (create, update, delete resource)
              - Subrequirements (optional buttons)
           3. Template features
              - Docker
              - Types (not ready yet)
    6.  Possible error messages and their possible reasons
        1. Error messages before selecting template requirements
           - Couldn't fetch the pack error
        2. Error messages during generation
           - Git is not installed error
           - Working directory is not a git repository error
           - Git repository is not clean error
           - Couldn't generate the code error
        3. Error messages during export
           - Couldn't export error
        4. Error messages during import
           - Couldn't import error
    7.  Possible missuses
        - Git branching missuse
        - Naming missuse
    8.  Contributing
        - github

8.  References
