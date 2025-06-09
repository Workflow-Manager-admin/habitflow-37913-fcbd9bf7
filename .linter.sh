#!/bin/bash
cd /home/kavia/workspace/code-generation/habitflow-37913-fcbd9bf7/habitflow
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

