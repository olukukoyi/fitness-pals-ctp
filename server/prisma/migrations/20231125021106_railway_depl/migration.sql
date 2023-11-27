-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Workout" (
    "workoutId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bodyPart" TEXT NOT NULL,
    "Reps" INTEGER NOT NULL,
    "Set" INTEGER NOT NULL,
    "ownerId" TEXT,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("workoutId")
);

-- CreateTable
CREATE TABLE "Measurements" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "bodyweight" INTEGER NOT NULL,
    "wingSpan" INTEGER NOT NULL,
    "bicepSize" INTEGER NOT NULL,
    "quadSize" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ownerId" TEXT,
    "postId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_workoutId_key" ON "Workout"("workoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Measurements_userId_key" ON "Measurements"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Diary_id_key" ON "Diary"("id");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurements" ADD CONSTRAINT "Measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
