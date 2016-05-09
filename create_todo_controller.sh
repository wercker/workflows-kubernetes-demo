#!/bin/bash

cat > todo-controller.json <<EOF
{
  "kind": "ReplicationController",
  "apiVersion": "v1",
  "metadata": {
    "name": "todo",
    "labels": {
      "name": "todo"
    }
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "name": "todo"
    },
    "template": {
      "metadata": {
        "labels": {
          "name": "todo",
          "deployment": "${WERCKER_GIT_COMMIT}"
        }
      },
      "spec": {
        "containers": [
          {
            "imagePullPolicy": "Always",
            "image": "quay.io/wercker/todo-demo-release:${WERCKER_GIT_COMMIT}",
            "name": "todo",
            "ports": [
              {
                "name": "http-server",
                "containerPort": 80,
                "protocol": "TCP"
              }
            ]
          }
        ]
      }
    }
  }
}
EOF
