sudo docker build . -t dev
sudo docker run -it -v "$PWD/src:/usr/app/src" -p 3000:3000 --rm --name dev dev
