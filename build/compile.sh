#!/bin/bash
java -jar compiler.jar \
--js_output_file=../js/jquery.presentr.min.js \
--compilation_level=SIMPLE_OPTIMIZATIONS \
--js=../js/jquery.presentr.js
