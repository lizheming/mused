rm -rf www
mkdir www
mkdir www/static

pnpm run --filter ../ui build
cp ../ui/dist/* ./www/static