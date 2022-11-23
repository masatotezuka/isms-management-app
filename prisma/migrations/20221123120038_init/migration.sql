-- CreateTable
CREATE TABLE "license_histories" (
    "id" SERIAL NOT NULL,
    "usage_status" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "licenseId" INTEGER,

    CONSTRAINT "PK_f7e3f66b3855d8604968753d1ed" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "purchased_at" DATE,
    "expired_at" DATE,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" INTEGER,

    CONSTRAINT "PK_da5021501ce80efa03de6f40086" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_histories" (
    "id" SERIAL NOT NULL,
    "usage_status" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "machine_id" INTEGER,

    CONSTRAINT "PK_6e68d67930a4dd55255acda15e1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machines" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "puchased_at" DATE,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" INTEGER,

    CONSTRAINT "PK_7b0817c674bb984650c5274e713" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_mail_settings" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "bodt_text" VARCHAR NOT NULL,
    "monthlySendDay" INTEGER NOT NULL,
    "is_valid_send_mail" BOOLEAN NOT NULL,
    "is_valid_remind" BOOLEAN NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" INTEGER,

    CONSTRAINT "PK_76b7db6ecad3c6d31be12563863" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_monthly_survey_checks" (
    "id" SERIAL NOT NULL,
    "reason_for_approval" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_monthly_survey_history_id" INTEGER,

    CONSTRAINT "PK_38fa9052ffc872b5d66453d0d13" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_monthly_survey_histories" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_mail_setting_id" INTEGER,

    CONSTRAINT "PK_ccff49158816a31576f0e72d23d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_licenses" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "user_id" INTEGER,
    "license_id" INTEGER,

    CONSTRAINT "PK_f9fdeafeac79f9c3ef6acbca1f2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_machines" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "user_id" INTEGER,
    "machine_id" INTEGER,

    CONSTRAINT "PK_f16d4070d0c9b64ed9db4c86e3b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_monthly_survey_answers" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "admin_monthly_survey_history_id" INTEGER,

    CONSTRAINT "PK_806bfcf4cd92989eac65ce7792e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "verification_token" VARCHAR,
    "verification_token_expired_at" TIMESTAMPTZ(6),
    "is_password_update" BOOLEAN NOT NULL,
    "role" INTEGER NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" INTEGER,

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "REL_9f18bb3405f6a46e962a49081b" ON "admin_mail_settings"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_licenses_license_id_key" ON "user_licenses"("license_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_machines_machine_id_key" ON "user_machines"("machine_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_97672ac88f789774dd47f7c8be3" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_verification_token_key" ON "users"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "REL_f3d6aea8fcca58182b2e80ce97" ON "users"("admin_id");

-- AddForeignKey
ALTER TABLE "license_histories" ADD CONSTRAINT "FK_38367e0d1c08e72c6dcbb84b807" FOREIGN KEY ("licenseId") REFERENCES "licenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "license_histories" ADD CONSTRAINT "FK_575d0a58e0c332892659055e8dc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "FK_4cf8941abbe3057dcface62688f" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "machine_histories" ADD CONSTRAINT "FK_2e708dadcc9855da6690f6e7199" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "machine_histories" ADD CONSTRAINT "FK_66400fe3c634514cdd836d4e4b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "FK_0e00fc2bf076a4cbf59f5449d14" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admin_mail_settings" ADD CONSTRAINT "FK_9f18bb3405f6a46e962a49081bd" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admin_monthly_survey_checks" ADD CONSTRAINT "FK_0e199c7a5b1a45fcbdda174cd98" FOREIGN KEY ("admin_monthly_survey_history_id") REFERENCES "admin_monthly_survey_histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admin_monthly_survey_histories" ADD CONSTRAINT "FK_c866199ab0a3a0ae74f0d749ddf" FOREIGN KEY ("admin_mail_setting_id") REFERENCES "admin_mail_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_licenses" ADD CONSTRAINT "FK_1f236ee512d052a2d30b16ca88c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_licenses" ADD CONSTRAINT "FK_58676d44946231dc974adc3ac7a" FOREIGN KEY ("license_id") REFERENCES "licenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_machines" ADD CONSTRAINT "FK_23686370ce613154537877407d7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_machines" ADD CONSTRAINT "FK_5edc031f5f5034ff19b34eadd93" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_monthly_survey_answers" ADD CONSTRAINT "FK_7fd388c5bd13aef8fb6c3427f29" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_monthly_survey_answers" ADD CONSTRAINT "FK_af3c1379e78c573fb707f402489" FOREIGN KEY ("admin_monthly_survey_history_id") REFERENCES "admin_monthly_survey_histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
