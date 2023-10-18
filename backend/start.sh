#!/bin/sh

if [ "$DO_MIGRATE" = "true" ]; then
  echo "Migrating database..."
  npx prisma migrate dev --preview-feature
  echo "Migration complete!"
fi

if [ "$DO_SEED" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed --preview-feature
  echo "Seeding complete!"
fi

npm start
