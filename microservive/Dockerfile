FROM golang:buster AS build
WORKDIR /go/src
COPY go ./go
COPY main.go .
COPY go.mod .

ENV CGO_ENABLED=0
RUN go get -t -x 

RUN go build -a -installsuffix cgo -o openapi .

FROM scratch AS runtime
COPY --from=build /go/src/openapi ./
EXPOSE 80/tcp
ENTRYPOINT ["./openapi"]
