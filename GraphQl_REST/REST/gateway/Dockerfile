# docker run -d --name express-gateway \
# -v /Users/naseef/Config:/var/lib/eg \
# -p 8080:8080 \
# -p 9876:9876 \
# express-gateway

FROM express-gateway:latest
WORKDIR /var/lib/eg
COPY ./Config .

EXPOSE 8080 9876 8443