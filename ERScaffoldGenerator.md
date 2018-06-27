# Requerements

## Node editor

 - New node on double click (or "A" key ?)
 - drag & drop handles for conneting two node
 - drag & drop nodes for moving them
 - double click on a node to edit it's name
 - click for selecting and press 'delete' key for deleting a node, connection,  (The software shouldn't ask for deleting, but should offer an undo option)
 - It should have a button for activating changes or creating files if they not exist
 - When we click to a column we can add key, type, 
 - There would be a list of avalaible views for the selected connections.

 - save and load the structure
## Deployer
Deployer will create the files from the template.
If the file exists and it is not identical with the generated, the deployer will ask for rewriting it.
It will be good if the software would determine the changes between the two generations and warn only if it is conflicting.

## Templates

### language elements 
it needs all support of a basic language e.g python

### classes

#### EntitiyCollection
#### EntitiyClass
 - getEntities() : EntityCollection
 - getEntitiyNameSingular() : String
 - getEntitiyNamePlural() : String
#### Entitiy
 - getHasManyParticipants() : EntitiyClass
 - getEqualParticipants() : EntitiyClass
 - getBelongsToParticipants() : EntitiyClass
 - getEntitiyNameSingular() : String
 - getEntitiyNamePlural() : String
 - getColumns() : ColumnCollection
#### Column
 - getName() : String
 - getPlaceholder() : String
 - getType() : String

### examples

```html
@func something(rootClass)
	<table>
	@for(A in rootClass.getEntities())

		@for(col in A.getColumns())
			{{ col.getPlaceholder() }} : @input(col.getType(),col.getName())
		@endfor

		@for(participantClass in A.getHasManyParticipants())
			%something(participantClass)
		@endfor

	@endfor
@endfunc

@something(root)
</table>
```

## tidy 

Get the optimal positions for columns around the node
it shouldn't overlap with the connections
