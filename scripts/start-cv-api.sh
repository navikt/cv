#!/usr/bin/env bash

if [ "$ER_VEILEDER" == true ]
then
  MANUELL=true
else
  MANUELL=false
fi

cd ../pam-cv-api-gcp
TESTBRUKER_FNR=04010100653 TESTBRUKER_UNDER_OPPFOLGING=true TESTBRUKER_ER_MANUELL="$MANUELL" ./gradlew runLocal
