<?php

class Comment
{
    private int $id;
    private int $user_id;
    private int $imdb_id;
    private int $rating;
    private str $title;
    private str $comment;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->user_id;
    }

    /**
     * @param int $user_id
     */
    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    /**
     * @return int
     */
    public function getImdbId(): int
    {
        return $this->imdb_id;
    }

    /**
     * @param int $imdb_id
     */
    public function setImdbId(int $imdb_id): void
    {
        $this->imdb_id = $imdb_id;
    }

    /**
     * @return int
     */
    public function getRating(): int
    {
        return $this->rating;
    }

    /**
     * @param int $rating
     */
    public function setRating(int $rating): void
    {
        $this->rating = $rating;
    }

    /**
     * @return str
     */
    public function getTitle(): str
    {
        return $this->title;
    }

    /**
     * @param str $title
     */
    public function setTitle(str $title): void
    {
        $this->title = $title;
    }

    /**
     * @return str
     */
    public function getComment(): str
    {
        return $this->comment;
    }

    /**
     * @param str $comment
     */
    public function setComment(str $comment): void
    {
        $this->comment = $comment;
    }


}
