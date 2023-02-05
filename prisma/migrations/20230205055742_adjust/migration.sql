-- DropForeignKey
ALTER TABLE "machine_histories" DROP CONSTRAINT "machine_histories_machine_id_fkey";

-- AddForeignKey
ALTER TABLE "machine_histories" ADD CONSTRAINT "machine_histories_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
