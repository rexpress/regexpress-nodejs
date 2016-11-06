FROM alpine:3.4

RUN apk update && \
    apk add --no-cache nodejs=6.2.0-r0 && \
    cd /root && \
    echo "node /root/JavascriptTester.js \"\$@\"" > run.sh && \
    chmod 755 run.sh && \
    rm -rf /tmp/*
    
ENTRYPOINT ["/bin/sh", "/root/run.sh"]