rm -rf www
mkdir www
mkdir www/static

pnpm run --filter ../ui build
rc=$?
if [[ $rc != 0 ]];
then 
  exit $rc
fi

cp ../ui/dist/* ./www/static

pnpm run --filter ./ apidoc
rc=$?
if [[ $rc != 0 ]];
then 
  exit $rc
fi
