# Prisma Schema Models

## Course:
Represents a learning course offered on the platform.

### Fields:
- `id` : Unique identifier (UUID) for the course.
- `userId` : ID of the user who created the course (likely a foreign key).
- `title` : Title of the course.
- `description` : Optional description of the course.
- `imageUrl` : Optional URL for the course image.
- `price` : Optional price of the course (can be free or paid).
- `isPublished` : Boolean flag indicating if the course is published.
- `categoryId` : Optional ID of the category the course belongs to (foreign key).
- `category` : Relationship to the Category model for fetching category details.
- `chapters` : List of Chapter models associated with the course.
- `attachments` : List of Attachment models associated with the course.
- `purchases` : List of Purchase models for users who purchased the course.
- `wishlists` : List of Wishlist models for users who wishlisted the course.
- `createdAt` : Date and time the course was created.
- `updatedAt` : Date and time the course was last updated.
- `@@index([title])` : Creates an index on the title field for faster search.

## Category:
Represents a category for grouping courses.

### Fields:
- `id` : Unique identifier (UUID) for the category.
- `name` : Unique name for the category.
- `courses` : List of Course models that belong to this category.

## Attachment:
Represents an attachment associated with a course (e.g., downloadable content).

### Fields:
- `id` : Unique identifier (UUID) for the attachment.
- `name` : Name of the attachment.
- `url` : URL for downloading the attachment.
- `courseId` : ID of the course the attachment belongs to (foreign key).
- `course` : Relationship to the Course model for fetching course details.
- `createdAt` : Date and time the attachment was created.
- `updatedAt` : Date and time the attachment was last updated.
- `@@index([courseId])` : Creates an index on the courseId field for faster search.

## Chapter:
Represents a chapter within a course.

### Fields:
- `id` : Unique identifier (UUID) for the chapter.
- `title` : Title of the chapter.
- `description` : Optional description of the chapter.
- `videoUrl` : Optional URL for a video associated with the chapter.
- `isPublished` : Boolean flag indicating if the chapter is published.
- `isFree` : Boolean flag indicating if the chapter is free or requires purchase.
- `position` : Integer representing the order of the chapter within the course.
- `muxData` : Relationship to the optional MuxData model (likely for video playback management).
- `courseId` : ID of the course the chapter belongs to (foreign key).
- `course` : Relationship to the Course model for fetching course details.
- `userProgress` : List of UserProgress models for tracking user progress within the chapter.
- `createdAt` : Date and time the chapter was created.
- `updatedAt` : Date and time the chapter was last updated.
- `@@index([courseId])` : Creates an index on the courseId field for faster search.

## MuxData:
Used for managing video playback using a service like Mux.

### Fields:
- `id` : Unique identifier (UUID) for the MuxData.
- `assetsId` : ID of the video asset on the Mux platform.
- `playbackId` : Optional playback ID for the video.
- `chapterId` : Unique identifier of the chapter this MuxData is associated with (foreign key).
- `chapter` : Relationship to the Chapter model for fetching chapter details.


## UserProgress:
Tracks a user's progress within a chapter.

### Fields:
- `id` : Unique identifier (UUID) for the user progress record.
- `userId` : ID of the user who's progress is being tracked (foreign key).
- `chapterId` : ID of the chapter the progress is for (foreign key).
- `chapter` : Relationship to the Chapter model for fetching chapter details.
- `isCompleted` : Boolean flag indicating if the user has completed the chapter.
- `createdAt` : Date and time the user progress record was created.
- `updatedAt` : Date and time the user progress record was last updated.
- `@@unique([chapterId, userId])` : Ensures a user can only have one progress record for a specific chapter.
- `@@index([chapterId])` : Creates an index on the chapterId field for faster search based on chapter.

## Purchase:
Represents a purchase of a course by a user.

### Fields:
- `id` : Unique identifier (UUID) for the purchase record.
- `userId` : ID of the user who purchased the course (foreign key).
- `courseId` : ID of the purchased course (foreign key).
- `course` : Relationship to the Course model for fetching course details.
- `createdAt` : Date and time the purchase was made.
- `updatedAt` : Date and time the purchase record was last updated.
- `@@unique([courseId, userId])` : Ensures a user can only purchase a course once.
- `@@index([courseId])` : Creates an index on the courseId field for faster search based on purchased courses.

## Wishlist:
Represents a course wishlisted by a user.

### Fields:
- `id` : Unique identifier (UUID) for the wishlist record.
- `userId` : ID of the user who wishlisted the course (foreign key).
- `courseId` : ID of the wishlisted course (foreign key).
- `course` : Relationship to the Course model for fetching course details.
- `createdAt` : Date and time the course was added to the wishlist.
- `updatedAt` : Date and time the wishlist record was last updated.
- `@@unique([userId, courseId])` : Ensures a course can only be wishlisted by a user once.
- `@@index([courseId])` : Creates an index on the courseId field for faster search based on wishlisted   courses.

## Customer :
This model might be for future implementation and currently not used.

### Fields:
- `id` : Unique identifier (UUID) for the customer.
- `userId` : Unique ID of the user associated with the customer (foreign key).
- `customerId`: Unique identifier for the customer in an external system (e.g., payment gateway).
- `createdAt` : Date and time the customer record was created.
- `updatedAt` : Date and time the customer record was last updated.