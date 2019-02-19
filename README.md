# ERScaffold - The advenced code generator for web applications


## Ideas

### Using the ER editor

  - Creating new entity with double click
  - Creating connections by drag and drop the right handle to the entity you want to be connected
  - Double click to change every element on the canvas
  - Click to the + button to add attributes
  - Click to the x button to delete element

### Deployer

Deployer will create the files by the diagram.
If the file exists and if not identical with the generated files, the deployer will ask you about rewriting it.

### Templates
Templates should support all features that a main language like javascript does.

## Comparing with the other online editors

| Tool           | Create Entitiy | Add Attribute | Connect Entities                            | Delete things |
| -------------- | -------------- | ------------- | ------------------------------------------- | ------------- | 
| erdplus.com    | 2 step         | 4 step        | 2 step + config participation & cardinality | 2 step        |
| draw.io        | many           | many          | too many                                    | 2 step        |
| gliffy.com     | many           | many          | too many                                    | 2 step        |
| sqldbm.com     | 3 step         | many          | 3 step + config                             | 3 step        |
| smartdraw.com  | 2 step         | many          | too many                                    | 2 step        |
| My tool        | 1 step         | 1 step        | 1 step                                      | 1 step        |

Moreover, ERScaffold will have:
 - full screen diagram displaying without panels that uses too many places
 - Auto ordering attributes 
