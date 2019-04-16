docker build -t rahulgupta1199/worthero-client:latest -t rahulgupta1199/worthero-client:$SHA -f ./client/Dockerfile ./client
docker build -t rahulgupta1199/worthero-server:latest -t rahulgupta1199/worthero-server:$SHA -f ./server/Dockerfile ./server

docker push rahulgupta1199/worthero-client:latest
docker push rahulgupta1199/worthero-server:latest

docker push rahulgupta1199/worthero-client:$SHA
docker push rahulgupta1199/worthero-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=rahulgupta1199/worthero-client:$SHA
kubectl set image deployments/server-deployment server=rahulgupta1199/worthero-server:$SHA