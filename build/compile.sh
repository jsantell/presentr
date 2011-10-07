#!/bin/bash
java -jar compiler.jar \
--js_output_file=../jquery.presentr.min.js \
--compilation_level=SIMPLE_OPTIMIZATIONS \
--js=../jquery.presentr.js
