# ERScaffold

ERScaffold is a code generator for websites, which uses ERModel as abstraction, so that makes it possible to generate complex frontend with a complex backend.  

For more details, please read the docs/Thesis/thesis.pdf .  

## Let's check out
  
Requirements:
 - Linux\GNU or Mac
 - NodeJS
 - NPM
 - Git
  
First, you will need to install dependencies with `npm i`,  
after that you can run with `npm run dev`.  

## Quick guide for a blog
For this test you will need *docker*, and *docker-compose*.

After you have ran `npm run dev`, you can start with electron, which makes it easier to launch.  
(For e.g : `electron path/of/this/folder path/of/the/new/project`)  
Or you can use `npm run dev` if you are familiar with that.  

### Setup project folder and run the app
```bash
~$ mkdir blogtest
~$ cd blogtest
~/blogtest$ git init
```
### Draw ER Model
Start application with the ~/blogtest folder, or start then select the ~/blogtest folder in order to start drawing. When the application is starting, you will see a guide. If you move your mouse over that guide, the guide will disappear. By this guide draw your model.

### Generation
If there is a project folder selected, and you wrote something into the AppName field, you are able to generate the code by clicking on Generate. 

You will see a window for selecting requirements. 
Please consider that, those are just example templates.

After selection, you should click on the select button, and it will returns 'All fine!' message if everything was alright. Otherwise you will see an error message, that you should tell me by the github's issue tracker.

### Run the example site
```bash
sudo systemctl start docker
sudo docker-compose up -d
```
While the server is running, you can edit the `lib/<APP_NAME>_web/router.ex` file and add a new route like:
`resources '/something', <EntityName>Controller`.

For e.g: `resources '/posts', PostController`.
When you save the file, by the phoenix's live-reload, you can see on `localhost:4000/posts`.

If something is not working then it is template-related problem, you can add custom templates, and you can modify the existing templates too. For details, please read the above mentioned thesis. 

## Contributing
I'd love to see any kind of contribution.
