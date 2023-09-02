# see:
# https://stackoverflow.com/questions/16956810/how-to-find-all-files-containing-specific-text-string-on-linux
# https://ss64.com/bash/grep.html

#grep -Rinw ./logs/ -e '0x5FbDB2315678afecb367f032d93F642f64180aa3'

grep --exclude-dir=node_modules/ -Rinw -e '0x5FbDB2315678afecb367f032d93F642f64180aa3'
