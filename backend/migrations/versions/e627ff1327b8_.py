"""empty message

Revision ID: e627ff1327b8
Revises: d5a47d5bd75a
Create Date: 2023-08-01 16:19:15.646720

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e627ff1327b8'
down_revision = 'd5a47d5bd75a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('expenses', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.NUMERIC(precision=15, scale=2),
               type_=sa.Numeric(precision=15, scale=1),
               existing_nullable=False)

    with op.batch_alter_table('income', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.NUMERIC(precision=15, scale=6),
               type_=sa.Numeric(precision=15, scale=1),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('income', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Numeric(precision=15, scale=1),
               type_=sa.NUMERIC(precision=15, scale=6),
               existing_nullable=False)

    with op.batch_alter_table('expenses', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Numeric(precision=15, scale=1),
               type_=sa.NUMERIC(precision=15, scale=2),
               existing_nullable=False)

    # ### end Alembic commands ###
