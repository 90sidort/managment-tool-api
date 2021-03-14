db.createUser({
  user: 'dbadmin',
  pwd: 'sercet_password',
  roles: [
    {
      role: 'readWrite',
      db: 'managment_tool_db',
    },
  ],
});
