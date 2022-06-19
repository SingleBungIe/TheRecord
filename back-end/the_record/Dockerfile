FROM openjdk:8 AS builder
WORKDIR /the_record
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew clean build
RUN ls build/libs

FROM adoptopenjdk:8-jdk
COPY --from=builder /the_record/build/libs/*.jar ./

ARG profile=prod

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./the_record-0.0.1-SNAPSHOT.jar", "-Dspring-boot.run.arguments=--profile=${profile}, --MYSQL_DATABASE_URL=${MYSQL_DATABASE_URL}, --MYSQL_DATABASE_USERNAME=${MYSQL_DATABASE_USERNAME}, --MYSQL_DATABASE_PASSWORD=${MYSQL_DATABASE_PASSWORD}, --OPENVIDU_SECRET=${OPENVIDU_SECRET}, --OPENVIDU_URL=${OPENVIDU_URL}, --RECORD_SECRET=${RECORD_SECRET}, --GMAIL_ID=${GMAIL_ID}, --GMAIL_PW=${GMAIL_PW}, --S3_BUCKET=${S3_BUCKET}, --S3_ACCESSKEY=${S3_ACCESSKEY}, --S3_SECRET_KEY=${S3_SECRET_KEY}"]
