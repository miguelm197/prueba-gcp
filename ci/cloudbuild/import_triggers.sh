#!/bin/bash
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# A script for importing Cloud Build build triggers.

# `-e` enables the script to automatically fail when a command fails
# `-o pipefail` sets the exit code to the rightmost comment to exit
# with a non-zero
set -eo pipefail

NODE_VERSIONS=(
    "14"
)

PROGRAM_PATH="$(realpath "$0")"
PROGRAM_DIR="$(dirname "${PROGRAM_PATH}")"

# Always move to the project root.
echo "change directory to the project root"
cd ${PROGRAM_DIR}/../..
pwd

echo "importing Cloud Build triggers"

for NODE_VERSION in ${NODE_VERSIONS[@]}; do
    echo "importing presubmit build for node${NODE_VERSION}"
    gcloud beta builds triggers import --source "ci/cloudbuild/export/gcb-presubmit-node${NODE_VERSION}.yaml"
    echo "importing continuous build for node${NODE_VERSION}"
    gcloud beta builds triggers import --source "ci/cloudbuild/export/gcb-continuous-node${NODE_VERSION}.yaml"
    echo "importing nightly build for node${NODE_VERSION}"
    gcloud beta builds triggers import --source "ci/cloudbuild/export/gcb-nightly-node${NODE_VERSION}.yaml"
done
