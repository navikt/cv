#!/usr/bin/env bash

cd ../pam-cv-api-gcp
TESTBRUKER_FNR=04010100653 TESTBRUKER_UNDER_OPPFOLGING=true ./gradlew runLocal
