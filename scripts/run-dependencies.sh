#!/usr/bin/env bash

stop_all_containers() {
  echo "STOPPER DOCKER"
  docker stop $(docker ps -a -q)
  echo
  echo "Alle avhengigheter er stoppet"
}

trap stop_all_containers SIGINT

script_full_path=$(dirname "$0")

$script_full_path/start-docker-compose.sh
$script_full_path/start-cv-api.sh

wait
