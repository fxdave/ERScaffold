# Abstract

This thesis is about creating a code generator for web applications that are using relational database system for storing data and the whole application logic mirrors the structure of the database. This thesis is NOT about generating database scheme, this is about generating only application code, based on a model that is understandable enough to be able to show it to a customer, but also as powerful as a database logic model.

There are numerous examples when the companies do not spend time for the well structured program code. They uses components like wordpress that is a general porpose content management system (CMS), but was designed for blogs. General porpose systems are not well suited for any kind of problems. As its CMS nature, wordpress or any other kind of "component" are full of unneccessary automations which increases the complexity of the development. The best solution is always to develop a new system for the given problem from scratch. It is also understandable that it is the most expenesive one. This thesis solves a part of this problem with a code generator.

Every problem can be losely simplified, this method is called as the generalization. The most of the web applications are basically content management systems. Almost all of these apllies simple forms for managing the content. These forms nearly build up the whole application from the database layer to the view layer, but also have numerous common parts that allows us to generate it.




