import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', Table => {
        Table.increments('id').primary();
        Table.string('name').notNullable();
        Table.string('avatar').notNullable();
        Table.string('whatsapp').notNullable();
        Table.string('bio').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('users');
}