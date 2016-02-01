#!/bin/bash

set -e
while getopts ":x:c:p:" opt; do
	case $opt in
		x)
			cmd=$OPTARG
			;;
		c)
			consul=$OPTARG
			;;
		p)
			prefix=$OPTARG
			;;
		\?)
			echo "Invalid option: -$OPTARG"
			exit 1
			;;
		:)
			echo "Option -$OPTARG requires an argument"
			exit 1
			;;
	esac
done

if [ -z "$prefix" ]; then
	if [ -z "$cmd" ]; then
		exec "$@"
	else
		exec "$cmd"
	fi
else
	exec /bin/envconsul -consul=$consul -sanitize -upcase -prefix=$prefix $cmd
fi
