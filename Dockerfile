FROM regexpress/base:latest

COPY JavascriptTester.js /root

COPY JavascriptTesterTest.js /root

RUN apk update && \
    apk add --no-cache nodejs=6.7.0-r0 && \
    cd /root && \
    echo "arg=();for var in \"\$@\";do arg+=(\"\$(echo -n \"\$var\" | base64 -d)\"); done; node /root/JavascriptTester.js \"\${arg[@]}\"" > run.sh && \
    chmod 755 run.sh && \
    rm -rf /tmp/*
    
ENTRYPOINT ["/bin/bash", "/root/run.sh"]