package com.stayfolio.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

/** Minimal dependency-free API for the single focused listing experience. */
public final class ListingApi {
  private static final String LISTING_JSON = """
      {"id":"candolim-terrace","title":"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10","location":"Candolim, Goa, India","rating":4.95,"reviews":19,"price":28499}
      """;

  private ListingApi() { }

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
    server.createContext("/api/health", exchange -> respond(exchange, 200, "{\"status\":\"ok\"}"));
    server.createContext("/api/listings/candolim-terrace", exchange -> {
      if (!"GET".equals(exchange.getRequestMethod())) {
        respond(exchange, 405, "{\"error\":\"Method not allowed\"}");
        return;
      }
      respond(exchange, 200, LISTING_JSON);
    });
    server.setExecutor(null);
    server.start();
    System.out.println("Stayfolio API listening on http://localhost:8080");
  }

  private static void respond(HttpExchange exchange, int status, String body) throws IOException {
    byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
    exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
    exchange.getResponseHeaders().set("Cache-Control", "no-store");
    exchange.sendResponseHeaders(status, bytes.length);
    exchange.getResponseBody().write(bytes);
    exchange.close();
  }
}
