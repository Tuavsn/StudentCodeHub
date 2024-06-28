FROM maven:latest AS builder

WORKDIR /app/server

COPY src /app/src

COPY pom.xml /app

RUN mvn -f /app/pom.xml clean package -DskipTests

FROM eclipse-temurin:latest

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]