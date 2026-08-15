import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query({
    text: "SELECT version();",
  });

  const maxConnectionsResult = await database.query({
    text: "SHOW max_connections;",
  });

  const openConnectionsResult = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity;",
  });

  response.status(200).json({
    update_at: updateAt,
    databaseVersion: databaseVersionResult.rows[0].version,
    maxConnections: maxConnectionsResult.rows[0].max_connections,
    openConnections: openConnectionsResult.rows[0].count,
  });
}

export default status;
