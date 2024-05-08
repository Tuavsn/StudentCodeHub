package com.group7.studentcodehub.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class FetchApiUtil {

	public static JsonObject sendHttpRequestt(String url, Map<String, Object> body, Map<String, String> params,
			Map<String, String> headers, String method) throws IOException {
		if (params != null && !params.isEmpty()) {
			StringBuilder queryString = new StringBuilder();
			for (Map.Entry<String, String> entry : params.entrySet()) {
				queryString.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
			}
			url += "?" + queryString.toString();
		}
		HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
		connection.setRequestMethod(method);
		connection.setRequestProperty("Content-Type", "application/json");

		if (headers != null && !headers.isEmpty()) {
			for (Map.Entry<String, String> entry : headers.entrySet()) {
				connection.setRequestProperty(entry.getKey(), entry.getValue());
			}
		}

		connection.setDoOutput(true);

		if (body != null && !body.isEmpty()) {
			Gson gson = new Gson();
			String jsonBody = gson.toJson(body);
			try (OutputStream outputStream = connection.getOutputStream()) {
				byte[] input = jsonBody.getBytes("utf-8");
				outputStream.write(input, 0, input.length);
			}
		}

		StringBuilder response = new StringBuilder();
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
			String line;
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
		}

		connection.disconnect();

		Gson gson = new Gson();
		return gson.fromJson(response.toString(), JsonObject.class);
	}
}
