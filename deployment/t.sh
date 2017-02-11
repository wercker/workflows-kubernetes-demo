#!/bin/sh

# Purpose of this file is to populate ENV variables

eval "cat <<EOF
$(cat "$1")
EOF"
